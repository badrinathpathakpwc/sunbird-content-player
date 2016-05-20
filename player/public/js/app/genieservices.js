genieservice_web = {
    api: {
        basePath: '/genie-canvas/v2/',
        contentList: 'content/list',
        getFullAPI: function(specificApi) {
            return this.basePath + specificApi;
        },
        getContentList: function() {
            return this.getFullAPI(this.contentList);
        }
    },
    getCurrentUser: function() {
        return new Promise(function(resolve, reject) {
            var result = {};
            result.status = "success";
            result.data = {
                "avatar": "resource1",
                "gender": "male",
                "handle": "handle1",
                "uid": "8hjh3c4b7b47d570df0ec286bf7adc8ihhnjy",
                "age": 6,
                "standard": -1
            };
            resolve(result);
        });
    },
    getMetaData: function() {
        return new Promise(function(resolve, reject) {
            var result = {};
            result = {
                "flavor": "sandbox",
                "version": "1.0.1"
            };
            resolve(result);
        });
    },
    getContent: function(id, url) {
        if(webview) {
            return new Promise(function(resolve, reject) {
                if(content) {
                    resolve(content.metadata);
                } 
                // else {
                //     jQuery.post(genieservice_web.api.getContentList(), function(resp) {
                //         var result = {};
                //         if (!resp.error) {
                //             result.list = resp;
                //             console.log(result.list);
                //             var item = _.findWhere(resp.content, { "identifier": id });
                //             console.log(item);
                //             resolve(item);
                //         } else {
                            
                //             reject(resp);
                //         }
                //     })
                //     .fail(function(err) {
                //         reject(err);
                //     });
                // }
            });
        } else {
            return new Promise(function(resolve, reject) {
                    jQuery.post(genieservice_web.api.getContentList(), function(resp) {
                        var result = {};
                        if (!resp.error) {
                            result.list = resp;
                            var item = _.findWhere(resp.content, { "identifier": id });
                            resolve(item);
                        } else {
                            
                            reject(resp);
                        }
                    })
                    .fail(function(err) {
                        reject(err);
                    });
                });
            }     
    },
    getContentList: function(filter) {
        return new Promise(function(resolve, reject) {
            jQuery.post(genieservice_web.api.getContentList(), function(resp) {
                    var result = {};
                    if (!resp.error) {
                        result.list = resp.content;
                        resolve(result);
                    } else {
                        reject(resp);
                    }
                })
                .fail(function(err) {
                    reject(err);
                });
        });
    },
    setAPIEndpoint: function(endpoint) {
        return endpoint;
    }
};
genieservice_portal = {
    getCurrentUser: function() {
        return new Promise(function(resolve, reject) {
            var result = {};
            result.status = "success";
            result.data = {
                "avatar": "resource1",
                "gender": "male",
                "handle": "handle1",
                "uid": "8hjh3c4b7b47d570df0ec286bf7adc8ihhnjy",
                "age": 6,
                "standard": -1
            };
            resolve(result);
        });
    },
    getMetaData: function() {
        return new Promise(function(resolve, reject) {
            var result = {};
            result = {
                "flavor": "sandbox",
                "version": "1.0.1"
            };
            resolve(result);
        });
    },
    getContentBody: function(id) {
        return new Promise(function(resolve, reject) {    
        jQuery.get("//sandbox-community.ekstep.in/api/learning/taxonomy-service/v2/content/" + id + "?fields=body", {"Content-Type" : "application/json"}, function(resp) {
            var result = {};
            if (!resp.error) {
                result.list = resp;
                resolve(resp.result.content);
            } else {
                console.info("err : ", resp.error)
            }
        });
        });
    },
    getContent: function(id){
        return genieservice_web.getContent(id);
    },
    getContentMetadata: function(id) {
        return new Promise(function(resolve, reject) {    
        jQuery.get("//sandbox-community.ekstep.in/api/learning/taxonomy-service/v2/content/"+ id, {"Content-Type" : "application/json"}, function(resp) {
            var result = {};
            if (!resp.error) {
                result.list = resp;
                var metadata = resp.result.content;
                var map = {};
                map.identifier = metadata.identifier;
                map.localData = metadata;
                map.mimeType = metadata.mimeType;
                map.isAvailable = true;
                map.path = "stories/" + metadata.code;
                resolve(map);
            } else {
                console.info("err : ", resp.error)
            }
        });
        });
    }

};
if ("undefined" == typeof cordova) {
    if(webview) 
        genieservice = genieservice_portal;
    else
        genieservice = genieservice_web;
}

telemetry_web = {
    tList: [],
    send: function(string) {
        return new Promise(function(resolve, reject) {
            telemetry_web.tList.push(string);
            resolve(true);
        });
    }
};
if ("undefined" == typeof cordova) telemetry = telemetry_web;