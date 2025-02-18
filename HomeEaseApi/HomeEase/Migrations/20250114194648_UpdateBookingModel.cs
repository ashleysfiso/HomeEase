using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBookingModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "AdditionalInformation",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "183158ef-2617-4343-8659-a9ce94e6b473", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "ebc23e29-3ee5-448c-80c9-eb2a2abce9aa", null, "Customer", "CUSTOMER" },
                    { "ec11dce5-54d8-4727-a138-dd8528674aff", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "183158ef-2617-4343-8659-a9ce94e6b473");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ebc23e29-3ee5-448c-80c9-eb2a2abce9aa");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ec11dce5-54d8-4727-a138-dd8528674aff");

            migrationBuilder.DropColumn(
                name: "AdditionalInformation",
                table: "Bookings");

            migrationBuilder.AddColumn<string>(
                name: "Extras",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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
    }
}
