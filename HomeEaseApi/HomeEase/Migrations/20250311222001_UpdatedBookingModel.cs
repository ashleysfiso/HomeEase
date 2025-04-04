using System;
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
                keyValue: "34ad5fb5-58ad-4ed7-aa5c-3f1404595130");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ca461194-390e-4f9f-b76a-8b33f242d765");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "db976054-7d93-49c2-9e37-f6514740c670");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "BookingDate",
                table: "Bookings",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<string>(
                name: "Time",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Time",
                table: "Bookings");

            migrationBuilder.AlterColumn<DateTime>(
                name: "BookingDate",
                table: "Bookings",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "34ad5fb5-58ad-4ed7-aa5c-3f1404595130", null, "Customer", "CUSTOMER" },
                    { "ca461194-390e-4f9f-b76a-8b33f242d765", null, "ServiceProvider", "SERVICEPROVIDER" },
                    { "db976054-7d93-49c2-9e37-f6514740c670", null, "Admin", "ADMIN" }
                });
        }
    }
}
