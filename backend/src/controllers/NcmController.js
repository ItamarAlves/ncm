import cheerio from 'cheerio';
import requestHtml from 'request';

class NcmController {
    index(request, response) {

        var { ncmsArray } = request.body;

        // console.log(ncmsArray);
        // console.log(ncmsArray.length);

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
                        
                        var dataExpired = $(this).find('.text-danger').text().trim();
                        
                        var ativoInativo = 0;
                        if (dataExpired == null || dataExpired == "") {
                            ativoInativo = 1;
                        }
                        
                        response.json({
                            "NCM: ": ncm,
                            "Data Expirada: ": dataExpired,
                            "Ativo-Inativo": ativoInativo
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
