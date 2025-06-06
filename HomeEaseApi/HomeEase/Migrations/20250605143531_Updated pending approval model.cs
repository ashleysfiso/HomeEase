using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class Updatedpendingapprovalmodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "PendingApprovals",
                newName: "LastName");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "PendingApprovals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "PendingApprovals");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "PendingApprovals",
                newName: "FullName");
        }
    }
}
