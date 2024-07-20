﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using UsersApi.Moleds;

#nullable disable

namespace timeTrackerApi.Migrations
{
    [DbContext(typeof(UserDbContext))]
    partial class UserDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.29")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("UsersApi.Models.TaskInfo", b =>
                {
                    b.Property<int>("TaskId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TaskId"), 1L, 1);

                    b.Property<bool>("IsChecked")
                        .HasColumnType("bit");

                    b.Property<string>("TaskName")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("date")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("duration")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("userId")
                        .HasColumnType("int");

                    b.HasKey("TaskId");

                    b.ToTable("Tasks");
                });

            modelBuilder.Entity("UsersApi.Moleds.UserInfo", b =>
                {
                    b.Property<int>("userId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("userId"), 1L, 1);

                    b.Property<string>("NameOfUser")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("ProfilePicturePath")
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("birthDate")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("codeMeli")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("userName")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("userId");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
