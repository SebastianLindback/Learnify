using System.Text.Json;
using Entity;
using Microsoft.Extensions.Logging;

namespace Infrastructure
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILogger logger)
        {
            try
            {
                if (!context.Courses.Any()){
                    var courseData = File.ReadAllText("../Infrastructure/SeedData/courses.json");
                    var courses = JsonSerializer.Deserialize<List<Course>>(courseData);
                    
                    foreach (var course in courses)
                    {
                        context.Courses.Add(course);
                    }

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                logger.LogError(e.Message);
            }
            
        }
    }
}