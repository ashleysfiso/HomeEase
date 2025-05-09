using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class Isdeletedonservicemodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0b3d4f18-a7ab-4dd9-b356-3fed551d8754");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "43013a19-a811-481e-9339-0317d492e14b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a8e60e6c-af78-416c-89e2-8aca0d289a82");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2598a214-2d6b-4995-85a9-896676c356ac", null, "Admin", "ADMIN" },
                    { "97624ff1-1336-412c-8bf2-3cd66103f6fd", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "c8452f5f-d321-484b-8650-b136ce66bf09", null, "Customer", "CUSTOMER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2598a214-2d6b-4995-85a9-896676c356ac");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "97624ff1-1336-412c-8bf2-3cd66103f6fd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c8452f5f-d321-484b-8650-b136ce66bf09");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0b3d4f18-a7ab-4dd9-b356-3fed551d8754", null, "Customer", "CUSTOMER" },
                    { "43013a19-a811-481e-9339-0317d492e14b", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "a8e60e6c-af78-416c-89e2-8aca0d289a82", null, "Admin", "ADMIN" }
                });
        }
    }
}
