import cheerio from 'cheerio';
import requestHtml from 'request';

class NcmController {
    index(request, response) {

        var ncmCodigoArray = request.body;

        const url = "https://cosmos.bluesoft.com.br/ncms/21069029";

            
            
            requestHtml(url, function(error, responseHtml, html){
                if (!error) {
                    var $ = cheerio.load(html);
                    
                    $('#container-principal').each(function() {
                        var ncm = $(this).find('#ncm-description').text().trim();
                        
                        var dataExpired = $(this).find('.text-danger').text().trim();
                        
                        var ativoInativo = 0;
                        if (dataExpired == null || dataExpired == "") {
                            console.log("Esse ncm está ativo.");
                            ativoInativo = 1;
                        }
                        
                        response.json({
                            "NCM: ": ncm,
                            "Data Expirada: ": dataExpired,
                            "Ativo-Inativo": ativoInativo
                        })
                    })  
                }
        });
    }
    
    store(request, response) {
        
    }
}

export default new NcmController();
