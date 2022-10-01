var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;
// Add services to the container.


builder.Services.AddControllers();

var connectionString =
builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddIdentityCore<User>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<StoreContext>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                            .GetBytes(configuration["JWT:TokenKey"]))
                    };
                });
builder.Services.AddAuthorization();
builder.Services.AddAuthentication();
builder.Services.AddIdentityCore<User>(opt =>
                {
                    opt.User.RequireUniqueEmail = true;
                });
builder.Services.AddAutoMapper(typeof(MappingProfiles));
builder.Services.AddScoped<PaymentService>();
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddDbContext<StoreContext>(x =>
{
    x.UseSqlite(
        connectionString,
    x => x.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)
    );
});
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
        .WithOrigins("http://localhost:3000");
    });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = actionContext =>
    {
        var errors = actionContext.ModelState
        .Where(e => e.Value.Errors.Count > 0)
        .SelectMany(x => x.Value.Errors)
        .Select(x => x.ErrorMessage).ToArray();

        var errorResponse = new ApiValidationErrorResponse
        {
            Errors = errors
        };

        return new BadRequestObjectResult(errorResponse);
    };
});
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    var context = scope.ServiceProvider.GetRequiredService<StoreContext>();

    await context.Database.MigrateAsync();
    await StoreContextSeed.SeedAsync(context, logger, userManager);
}
app.UseMiddleware<ExeptionMiddleware>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStatusCodePagesWithReExecute("/redirect/{0}");
//No need during local development
//app.UseHttpsRedirection();
app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
