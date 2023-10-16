﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Models;

#nullable disable

namespace Server.Migrations
{
    [DbContext(typeof(JobTrackContext))]
    [Migration("20231016212654_UpdateInterviewTable")]
    partial class UpdateInterviewTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Server.Models.Application", b =>
                {
                    b.Property<int>("ApplicationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ApplicationWebsite")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CompanyWebsite")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ContactEmail")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Notes")
                        .HasColumnType("longtext");

                    b.Property<string>("PositionTitle")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("ApplicationId");

                    b.HasIndex("UserId");

                    b.ToTable("Applications");
                });

            modelBuilder.Entity("Server.Models.Interview", b =>
                {
                    b.Property<int>("InterviewId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ApplicationId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("InterviewAddress")
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("InterviewDate")
                        .IsRequired()
                        .HasColumnType("datetime(6)");

                    b.Property<string>("InterviewerEmail")
                        .HasColumnType("longtext");

                    b.Property<string>("InterviewerName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int?>("InterviewerPhoneNumber")
                        .HasColumnType("int");

                    b.Property<string>("InterviewerTitle")
                        .HasColumnType("longtext");

                    b.Property<string>("Notes")
                        .HasColumnType("longtext");

                    b.Property<bool>("ThankYouSent")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime?>("ThankYouSentDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("InterviewId");

                    b.HasIndex("ApplicationId");

                    b.ToTable("Interviews");
                });

            modelBuilder.Entity("Server.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("DailySubmitGoal")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("GitHub")
                        .HasColumnType("longtext");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("LinkedIn")
                        .HasColumnType("longtext");

                    b.Property<string>("OtherWebsite")
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PersonalWebsite")
                        .HasColumnType("longtext");

                    b.Property<string>("PortfolioWebsite")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Server.Models.Application", b =>
                {
                    b.HasOne("Server.Models.User", "Applicant")
                        .WithMany("SubmittedApplications")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Applicant");
                });

            modelBuilder.Entity("Server.Models.Interview", b =>
                {
                    b.HasOne("Server.Models.Application", "Position")
                        .WithMany("Interviews")
                        .HasForeignKey("ApplicationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Position");
                });

            modelBuilder.Entity("Server.Models.Application", b =>
                {
                    b.Navigation("Interviews");
                });

            modelBuilder.Entity("Server.Models.User", b =>
                {
                    b.Navigation("SubmittedApplications");
                });
#pragma warning restore 612, 618
        }
    }
}
