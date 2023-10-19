export const getResponseError=(error)=>{
    if (error===null || error===undefined) {
        return null;
    }
    if(error.response){
        if(error.response.status===422 && error.response.data){
            const responseErrors=error.response.data.errors;
            if(responseErrors && Array.isArray(responseErrors)){
                const errorData={}
                for (const errorItem of responseErrors) {
                    errorData[errorItem.field]=errorItem.defaultMessage;
                }
                return errorData;
    
            }
        return error.response.data.errors;
        }
    }
}
