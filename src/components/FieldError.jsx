const FieldError = ({message}) => {
    if (message === undefined || message=== null) {
        return <></>;
    }
    //console.log(message)
    return (
        <>
        {Array.isArray(message)?(
            <>
                {message.map((msg,key)=>(
                    <li key={key} className="error-msg">
                        {msg}
                    </li>
                ))}   
            </>
        ):(
            <li className="error-msg">{message}</li>
        )}
        </>
    )
}

export default FieldError