using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class AddedsizetobookingDto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Size",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Size",
                table: "Bookings");
        }
    }
}
