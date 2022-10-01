using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class Course_AddNewDefaultValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9546dad1-5662-4aa7-8a95-d94bac6aa888");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b63d4fb2-046a-4c0b-8ce2-515e89565635");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "07f7ddf3-4dc4-40b4-91bc-f92f6e79971b", "b537a5c7-389d-4ef5-92b4-e1c68b7b18c9", "Student", "STUDENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "91978b5e-5541-4c7d-8b0f-a52fcd50aa18", "d5d530ff-b8a1-434f-8bf7-929a909d4198", "Instructor", "INSTRUCTOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "07f7ddf3-4dc4-40b4-91bc-f92f6e79971b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "91978b5e-5541-4c7d-8b0f-a52fcd50aa18");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "9546dad1-5662-4aa7-8a95-d94bac6aa888", "9a506187-4988-4857-b960-aa8d95774f17", "Student", "STUDENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "b63d4fb2-046a-4c0b-8ce2-515e89565635", "f91564c6-1125-43e7-922b-b2d0b246fd56", "Instructor", "INSTRUCTOR" });
        }
    }
}
