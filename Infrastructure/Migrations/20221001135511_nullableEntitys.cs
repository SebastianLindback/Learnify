using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class nullableEntitys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "07f7ddf3-4dc4-40b4-91bc-f92f6e79971b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "91978b5e-5541-4c7d-8b0f-a52fcd50aa18");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Categories",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "ClientId",
                table: "Baskets",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "111dcbd7-d9b4-4810-b3f2-f440e918e285", "53752641-9273-4b07-ba72-c53207a0bb82", "Student", "STUDENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d02d61bd-7721-473c-b8d9-e9f1701e769f", "5c6ef5e1-492b-44a6-8ac7-ae1e4088191f", "Instructor", "INSTRUCTOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "111dcbd7-d9b4-4810-b3f2-f440e918e285");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d02d61bd-7721-473c-b8d9-e9f1701e769f");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Categories",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ClientId",
                table: "Baskets",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "07f7ddf3-4dc4-40b4-91bc-f92f6e79971b", "b537a5c7-389d-4ef5-92b4-e1c68b7b18c9", "Student", "STUDENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "91978b5e-5541-4c7d-8b0f-a52fcd50aa18", "d5d530ff-b8a1-434f-8bf7-929a909d4198", "Instructor", "INSTRUCTOR" });
        }
    }
}
