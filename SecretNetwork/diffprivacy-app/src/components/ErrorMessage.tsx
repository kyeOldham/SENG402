export default function ErrorMessage( {messages}: {messages: any} ) {
    console.log(messages)
    if (!messages) return null;

    return (
      <div className="alert">
        <div className="flex-1">
          <label>{Object.keys(messages).map((key) => {
              return (
                <span className="error">{messages[key]} <br></br></span>
              )
          })}</label>
        </div>
      </div>
    );
  }
  