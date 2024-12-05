using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class FixServiceProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b83806ac-7ae7-4a07-ada6-49ee6569b264");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "da47efb4-a3d6-4ff1-92c7-73b7fe7665f7");

            migrationBuilder.RenameColumn(
                name: "MyProperty",
                table: "Services",
                newName: "CreatedAt");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b9af8998-e05d-4cc7-954b-b8033183edee", null, "User", "USER" },
                    { "e36c53d8-c6d7-47ec-93e6-791d47f66c2f", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b9af8998-e05d-4cc7-954b-b8033183edee");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e36c53d8-c6d7-47ec-93e6-791d47f66c2f");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Services",
                newName: "MyProperty");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b83806ac-7ae7-4a07-ada6-49ee6569b264", null, "User", "USER" },
                    { "da47efb4-a3d6-4ff1-92c7-73b7fe7665f7", null, "Admin", "ADMIN" }
                });
        }
    }
}
