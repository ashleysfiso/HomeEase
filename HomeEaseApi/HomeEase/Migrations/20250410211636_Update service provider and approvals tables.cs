using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class Updateserviceproviderandapprovalstables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2f8b8537-67e8-4c86-96c2-87fcb76bea28");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4aa17028-7c72-4019-af3b-40720e9ae478");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ad96e824-0b01-4f8a-bca4-9d3b3d8d8b7d");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "ServiceProviders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "PendingApprovals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3c260db9-a36d-4d5f-b9f3-566312833095", null, "Admin", "ADMIN" },
                    { "6a967299-3761-4f19-ac87-5fc8a7839be6", null, "Customer", "CUSTOMER" },
                    { "c3b80ee0-5f80-4d38-9baf-b912df86558c", null, "ServiceProvider", "SERVICEPROVIDER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3c260db9-a36d-4d5f-b9f3-566312833095");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6a967299-3761-4f19-ac87-5fc8a7839be6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c3b80ee0-5f80-4d38-9baf-b912df86558c");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "ServiceProviders");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "PendingApprovals");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2f8b8537-67e8-4c86-96c2-87fcb76bea28", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "4aa17028-7c72-4019-af3b-40720e9ae478", null, "Admin", "ADMIN" },
                    { "ad96e824-0b01-4f8a-bca4-9d3b3d8d8b7d", null, "Customer", "CUSTOMER" }
                });
        }
    }
}
