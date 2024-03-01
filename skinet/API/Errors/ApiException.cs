namespace API.Errors
{
    public class ApiException : ApiResponse
    {
        public ApiException(int StatusCode, string Message = null, string Details = null)
         : base(StatusCode, Message)
        {
            this.Details = Details;

        }

        public string Details { get; set; }
    }
}