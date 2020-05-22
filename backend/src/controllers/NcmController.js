import cheerio from 'cheerio';
import requestHtml from 'request';

class NcmController {
    index(request, response) {

        var { ncmsArray } = request.body;
        
        for (let i = 0; i < ncmsArray.length; i++) {
            var ncmId = ncmsArray[i];

            const url = "https://cosmos.bluesoft.com.br/ncms/"+ncmId;
            
            requestHtml(url, function(error, responseHtml, html) {
                if (!error) {
                    var $ = cheerio.load(html);
                    
                    // console.log(responseHtml);

                    var statusCode  = responseHtml.statusCode;

                    // if (statusCode != "200") {
                    $('#container-principal').each(function() {
                        var ncm = $(this).find('#ncm-description').text().trim();
                        
                        var splitArray = ncm.split("-");
                        var code = splitArray[0]; 
                        var shortDescription = splitArray[1];
                        var fullDescription = ncm.substring(code.length + 1, ncm.length);

                        var expiredDate = $(this).find('.text-danger').text().trim();
                        
                        var active = 0;
                        if (expiredDate == null || expiredDate == "") {
                            active = 1;
                        }
                        
                        response.json({
                            "Ncm": {
                                "code" : code,
                                "fullDescription": fullDescription,
                                "shortDescription": shortDescription,
                                "active": active,
                                "expiredDate": expiredDate
                            }
                        })
                    })
                // }
                }
        });
    }
    }
    
    store(request, response) {
        
    }
}

export default new NcmController();
