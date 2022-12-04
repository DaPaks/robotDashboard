namespace RobotDashboardApi.Data.Interfaces
{
    public interface IRobotRepository
    {
        Task<List<Robot>> GetRobots();

        Task<int> EditRobot(Robot robot);

        Task<int> CreateRobot(Robot robot);

        Task<int> DeleteRobot(int robotId);


    }
}
