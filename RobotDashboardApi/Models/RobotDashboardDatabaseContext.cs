using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace RobotDashboardApi.Models
{
    public partial class RobotDashboardDatabaseContext : DbContext
    {
        public RobotDashboardDatabaseContext()
        {
        }

        public RobotDashboardDatabaseContext(DbContextOptions<RobotDashboardDatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Robot> Robots { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=.;Database=RobotDashboardDatabase;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Robot>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("robot");

                entity.Property(e => e.RobotId).HasColumnName("robotId");

                entity.Property(e => e.RobotName)
                    .IsUnicode(false)
                    .HasColumnName("robotName");

                entity.Property(e => e.RobotSerialNumber).HasColumnName("robotSerialNumber");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
