using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedBookingModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8ed71bfa-380b-4856-9184-e981ecd26b27");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "96d80ba9-3de0-4ad4-84b3-ad1b12071a3d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ed7b08a9-065e-458b-a550-8ebc9bc3335a");

            migrationBuilder.AddColumn<string>(
                name: "Extras",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6eaa981a-ad97-4e61-b0c5-574c91de6b49", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "87918df0-3449-4081-a06c-68bdb5390a7f", null, "Customer", "CUSTOMER" },
                    { "8b09a3c5-5521-4797-9979-43db06ae80ed", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6eaa981a-ad97-4e61-b0c5-574c91de6b49");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "87918df0-3449-4081-a06c-68bdb5390a7f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b09a3c5-5521-4797-9979-43db06ae80ed");

            migrationBuilder.DropColumn(
                name: "Extras",
                table: "Bookings");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8ed71bfa-380b-4856-9184-e981ecd26b27", null, "Customer", "CUSTOMER" },
                    { "96d80ba9-3de0-4ad4-84b3-ad1b12071a3d", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "ed7b08a9-065e-458b-a550-8ebc9bc3335a", null, "Admin", "ADMIN" }
                });
        }
    }
}
