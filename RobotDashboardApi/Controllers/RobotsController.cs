using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RobotDashboardApi.Data.Interfaces;

namespace RobotDashboardApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RobotsController : ControllerBase
    {
        private readonly IRobotRepository _robotRepository;

        public RobotsController(IRobotRepository robotRepository)
        {
            _robotRepository = robotRepository;
        }

        [HttpGet("GetRobots")]
        public async Task<IActionResult> GetRobots()
        {
            var robots = await _robotRepository.GetRobots();
            return Ok(robots);
        }

        [HttpPost("Post")]
        public async Task<IActionResult> Post([FromBody] Robot robot)
        {
            var robots = await _robotRepository.CreateRobot(robot);
            return Ok(robots);
        }

        [HttpPut("Put")]
        public async Task<IActionResult> Put([FromBody] Robot robot)
        {
            var robots = await _robotRepository.EditRobot(robot);
            return Ok(robots);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var robots = await _robotRepository.DeleteRobot(id);
            return Ok(robots);
        }
    }
}
