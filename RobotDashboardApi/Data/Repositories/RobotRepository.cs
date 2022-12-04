using RobotDashboardApi.Data.Interfaces;

namespace RobotDashboardApi.Data.Repositories
{
    public class RobotRepository : IRobotRepository
    {
        public readonly RobotDashboardDatabaseContext _databaseContext;

        public RobotRepository(RobotDashboardDatabaseContext dbContext)
        {
            _databaseContext = dbContext;
        }
        public async Task<int> CreateRobot(Robot robot)
        {
            _databaseContext.Robots.Add(robot);
            await _databaseContext.SaveChangesAsync();
            return robot.RobotId;
        }

        public async Task<bool> DeleteRobot(int robotId)
        {
            var robot = await _databaseContext.Robots.Where(r => r.RobotId == robotId).FirstOrDefaultAsync();
            _databaseContext.Robots.Remove(robot);
            await _databaseContext.SaveChangesAsync();
            return true;
        }

        public async Task<int> EditRobot(Robot robot)
        {
            var robotToEdit = await _databaseContext.Robots.Where(r => r.RobotId == robot.RobotId).FirstOrDefaultAsync();
            robotToEdit.RobotName = robot.RobotName;
            await _databaseContext.SaveChangesAsync();
            return robot.RobotId;
        }

        public async Task<List<Robot>> GetRobots()
        {
            var result = await _databaseContext.Robots.ToListAsync();
            return result;
        }

        Task<int> IRobotRepository.DeleteRobot(int robotId)
        {
            throw new NotImplementedException();
        }
    }
}
