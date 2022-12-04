using System;
using System.Collections.Generic;

namespace RobotDashboardApi.Models
{
    public partial class Robot
    {
        public int RobotId { get; set; }
        public string? RobotName { get; set; }
        public int? RobotSerialNumber { get; set; }
    }
}
