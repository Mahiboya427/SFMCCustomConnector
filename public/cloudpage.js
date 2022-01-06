<script runat=server>
    Platform.Load("Core", "1.1.5");


    // load the SSJS library
    Platform.Function.ContentBlockByKey('ssjs-lib');
    
    // your auth key (not to confuse with the JWT token between SFMC and the custom activity endpoint)
    var AUTH_KEY = '123455678';


    try {


        // initialise the cloudpage
        var cp = new cloudpage();
		
		Platform.Response.Write(Stringify({
            status: status,
            message: 'STARTED'
        }));
		
		var stream = Platform.Function.ContentBlockByID("118424");
		
		Platform.Response.Write(Stringify({
            status: status,
            message: 'ENDED'
        }));

        // load the payload
        cp.isPayload(['subscriberKey','contentBlockKey','token','data']);
        var payload = cp.payload.qs;


        // check if the call is coming from ther custom activity endpoint. This could be extended by IP restriction or JWT
        if( payload.token !== AUTH_KEY) {
            throw 'Unauthorised'
        }


        // set data based on payload
        var subscriberKey = payload.subscriberKey,
            key = payload.contentBlockKey,
            data = payload.data,
            status = 200,
            message = 'Success';


        // load the content block and execute
        Platform.Function.ContentBlockByKey(key);


        // output a JSON response
        Platform.Response.Write(Stringify({
            status: status,
            message: message
        }));


    } catch(e) {
        Platform.Response.Write(Stringify({
            status: 500,
            error: e
        }));
    }
    
</script>