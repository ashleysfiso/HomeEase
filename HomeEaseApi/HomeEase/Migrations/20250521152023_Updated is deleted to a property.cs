﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeEase.Migrations
{
    /// <inheritdoc />
    public partial class Updatedisdeletedtoaproperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "ServiceOfferings",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "ServiceOfferings");
        }
    }
}
