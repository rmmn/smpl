function QueryParser({ query_url: url, output: _returns }) {
    let query = decodeURIComponent(url.split("?")[1]), //result - query string without page address "id=someName&userMail=some@mail.com&usText=MemoText"
        params = query.split("&"), //the result is an array of strings from the pairs "id = someName", "userMail=some@mail.com", "usText=MemoText"
        result = [],
        result_params = [];
    result_pair = [];
    result_obj = {};

    params.forEach(function (value, i) {
        let tmp = (value.split("=")[1]),
            tmp_param = (value.split("=")[0]);

        if (_returns == "query" && tmp != undefined) {
            result.push(tmp);

            //Checking whether there is in the address #
            if (tmp.indexOf("#") !== -1) {
                result.pop(result.length - 1);
                result.push(tmp.split('#')[0]);
            }
        }

        if (_returns == "param" && tmp != undefined) {
            result_params.push(tmp_param);
        }

        if (_returns == "pair" && tmp != undefined) {
            //Checking whether there is in the address #
            if (tmp.indexOf("#") !== -1) {
                result_params.pop(result_params.length - 1);
                let ltmp = tmp.split('#')[0];
                result_pair.push({ [tmp_param]: ltmp });
            } else {
                result_pair.push({ [tmp_param]: tmp });
            }
        }

        if (_returns == "object" && tmp != undefined) {
            //Checking whether there is in the address #
            if (tmp.indexOf("#") !== -1) {
                result_params.pop(result_params.length - 1);
                let ltmp = tmp.split('#')[0];
                result_obj[[tmp_param]] = ltmp;
            } else {
                result_obj[[tmp_param]] = tmp;
            }
        }

    });

    if (_returns == "query")
        return result;
    else if (_returns == "param")
        return result_params;
    else if (_returns == "pair")
        return result_pair;
    else if (_returns == "object")
        return result_obj;
}
