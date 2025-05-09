using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class updatedpenidngapprovalsmodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "18de215c-e468-4fbc-b125-f35276eba2eb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "281ca06b-a480-4aee-ab6c-6f3016dc4e96");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "699458c6-f72a-4310-84fe-092051ec6109");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "PendingApprovals",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Experience",
                table: "PendingApprovals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "PendingApprovals");

            migrationBuilder.DropColumn(
                name: "Experience",
                table: "PendingApprovals");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "18de215c-e468-4fbc-b125-f35276eba2eb", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "281ca06b-a480-4aee-ab6c-6f3016dc4e96", null, "Admin", "ADMIN" },
                    { "699458c6-f72a-4310-84fe-092051ec6109", null, "Customer", "CUSTOMER" }
                });
        }
    }
}
