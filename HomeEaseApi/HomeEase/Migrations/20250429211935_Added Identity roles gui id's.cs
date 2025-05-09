using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class AddedIdentityrolesguiids : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3c507b34-5cf1-427e-a59e-2d1536e4b620");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ca6763c5-25c4-4b4b-81ad-ef6d23b7a625");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f67e2ab8-2a49-4a26-96ef-13eb96c0f155");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5b86e0fc-c4a0-4bdf-ae25-e60b6b1e6e5a", null, "Customer", "CUSTOMER" },
                    { "849cd2f5-f16c-42b3-9aa1-b4e8cfb5fc0e", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "ad9c1a25-fba9-4a4a-a123-f0b3b3e9f23e", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5b86e0fc-c4a0-4bdf-ae25-e60b6b1e6e5a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "849cd2f5-f16c-42b3-9aa1-b4e8cfb5fc0e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ad9c1a25-fba9-4a4a-a123-f0b3b3e9f23e");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3c507b34-5cf1-427e-a59e-2d1536e4b620", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "ca6763c5-25c4-4b4b-81ad-ef6d23b7a625", null, "Customer", "CUSTOMER" },
                    { "f67e2ab8-2a49-4a26-96ef-13eb96c0f155", null, "Admin", "ADMIN" }
                });
        }
    }
}
