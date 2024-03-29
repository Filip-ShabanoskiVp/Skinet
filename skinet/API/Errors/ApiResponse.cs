
namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int StatusCode, string Message = null)
        {
            this.StatusCode = StatusCode;
            this.Message = Message ?? GetDefaultMessgeForStatusCode(StatusCode);
        }

        public int StatusCode { get; set; }

        public string Message { get; set; }


        private string GetDefaultMessgeForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                
                400 => "A bad request, you have made",
                401 => "Authorize, you are not",
                404 => "Resource found, it was not",
                500 => "Errors are path to the dark side. Errors lead to anger. Anger leads to hate. Hate leads to career change",
                _ => null
            };
        }
    }
}