namespace HomeEase.Utility
{
    public class ApiResponse<T>
    {
        public T Data { get; set; }
        public string Error { get; set; }
        public bool Success => Error == null;

        public static ApiResponse<T> Fail(string error) => new ApiResponse<T> { Error = error };
        public static ApiResponse<T> Ok(T data) => new ApiResponse<T> { Data = data };
    }
}
