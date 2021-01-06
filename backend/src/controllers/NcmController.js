import cheerio from 'cheerio';
import requestHtml from 'request';

class NcmController {
    //solucao consultando uma ncm por vez.
    index(request, response) {

        var { ncmsArray } = request.query;
        // console.log(ncmsArray);
        // console.log(ncmsArray.length);
        var size = 1;
        var ncmTemp = "";
        for (let i = 0; i < ncmsArray.length; i++) {
            size = ncmsArray[i].length;
            if (size > 1) continue;

            ncmTemp = ncmTemp + ncmsArray[i];
        }
        if (size === 1) {
            ncmsArray = [ncmTemp];
        }

        let ncmJson = new Array(ncmsArray.length);
        try {
            for (let i = 0; i < ncmsArray.length; i++) {
                var ncmId = ncmsArray[i];

                const url = "https://cosmos.bluesoft.com.br/ncms/" + ncmId;
                requestHtml(url, function (error, responseHtml, html) {
                    if (!error) {
                        var $ = cheerio.load(html);

                        var statusCode = responseHtml.statusCode;

                        if (statusCode == 200) {
                            $('#container-principal').each(function () {
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
                                if (fullDescription != null && fullDescription != "") {

                                    // ncmJson[i] = [
                                    // {
                                    //     "ncm" : {
                                    //         "code": code,
                                    //         "fullDescription": fullDescription,
                                    //         "shortDescription": shortDescription,
                                    //         "active": active,
                                    //         "expiredDate": expiredDate  
                                    //     }
                                    // }
                                    // ];

                                    console.log(ncmJson);

                                    response.json({
                                        "Ncm": {
                                            "code": code,
                                            "fullDescription": fullDescription,
                                            "shortDescription": shortDescription,
                                            "active": active,
                                            "expiredDate": expiredDate
                                        }
                                    })
                                } else {
                                    response.json({
                                        "Ncm": {
                                            "notFound": "Ncm nao encontrado."
                                        }
                                    })
                                }
                            })
                        } else {
                            response.json({
                                "Ncm": {
                                    "notFound": "Ncm nao encontrado."
                                }
                            })
                        }
                    }
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
    store(request, response) {
        
    }
}

export default new NcmController();