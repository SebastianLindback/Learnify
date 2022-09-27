using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class FixNonNullableString_PaymentIntentId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "44a108e8-8b95-43eb-9a92-22754732aaf1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "63ceea34-5956-4e04-a2a7-9d33ed1483bb");

            migrationBuilder.AlterColumn<string>(
                name: "PaymentIntentId",
                table: "Baskets",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "b23f03c0-bd67-4328-8a74-c4a0e6a5272a", "db3c46ac-92e4-4343-a171-232893e9de9f", "Student", "STUDENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "cf7d3e46-9467-49cb-bccc-0128eb0b7bf8", "58f46b5a-84a2-4770-9cea-26733ca35415", "Instructor", "INSTRUCTOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b23f03c0-bd67-4328-8a74-c4a0e6a5272a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cf7d3e46-9467-49cb-bccc-0128eb0b7bf8");

            migrationBuilder.AlterColumn<string>(
                name: "PaymentIntentId",
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
                values: new object[] { "44a108e8-8b95-43eb-9a92-22754732aaf1", "ba2bd834-72a2-42e1-ba55-85cfe5c7b3dc", "Student", "STUDENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "63ceea34-5956-4e04-a2a7-9d33ed1483bb", "608cc34e-f294-444e-aa53-25eb44c3e019", "Instructor", "INSTRUCTOR" });
        }
    }
}
