using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;

namespace HomeEase.Services
{
    public class ExpoNotification
    {
        public string To { get; set; }
        public string Sound { get; set; } = "default";
        public string Title { get; set; }
        public string Body { get; set; }
        public object Data { get; set; }
    }

    public class NotificationService
    {
        private readonly HttpClient _http;

        public NotificationService(HttpClient http)
        {
            _http = http;
            _http.DefaultRequestHeaders.Add("Accept", "application/json");
            _http.DefaultRequestHeaders.Add("Host", "exp.host");
        }

        public async Task SendNotificationAsync(string expoPushToken, string title, string body, object data = null)
        {
            var message = new ExpoNotification
            {
                To = expoPushToken,
                Title = title,
                Body = body,
                Data = new { }
            };

            // ✅ Make request
            var response = await _http.PostAsJsonAsync("https://exp.host/--/api/v2/push/send", message);

            // ✅ Read response body as string
            var responseContent = await response.Content.ReadAsStringAsync();

            // ✅ Log or inspect response
            Console.WriteLine("Expo Push Response:");
            Console.WriteLine(responseContent);

            // ✅ Throw if not successful (optional, but helps debug)
            

            // ✅ Optional: Parse JSON response to get ticket ID
            try
            {
                var json = JsonDocument.Parse(responseContent);
                if (json.RootElement.TryGetProperty("data", out var dataElement))
                {
                    Console.WriteLine($"Push ticket: {dataElement}");
                }
            }
            catch (JsonException ex)
            {
                Console.WriteLine($"Error parsing Expo response: {ex.Message}");
            }
        }
    }
}
