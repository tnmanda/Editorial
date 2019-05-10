using System.Linq;
using LNWCOE.Models.BWQ;
using LNWCOE.Module.BWQ.Interface;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace LNWCOE.Module.BWQ.Test
{
    public class BWQInstructionsTest
    {
        [Fact]
        public void BWQInstructions()
        {
            IQueryable<BWQInstructions> BWQInstructionsBWQInstructions = Enumerable.Empty<BWQInstructions>().AsQueryable();
            BWQInstructions ct = new BWQInstructions { BWQInstructionsID = 1, CreatedBy = "Test BWQInstructions" };

            Mock<IBWQInstructionsRepository> BWQInstructionsService = new Mock<IBWQInstructionsRepository>();
            BWQInstructionsData binsdata = new BWQInstructionsData();
            IConfiguration configuration = null;

            try
            {
                BWQInstructionsService.Setup(x => x.GetAll()).Returns(BWQInstructionsBWQInstructions);
                BWQInstructionsService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                BWQInstructionsService.Setup(x => x.Add(It.IsAny<BWQInstructions>())).Returns(ct);
                BWQInstructionsService.Setup(x => x.Delete(It.IsAny<BWQInstructions>())).Verifiable();
                BWQInstructionsService.Setup(x => x.UpdateInstruction(It.IsAny<BWQInstructionsData>(), It.IsAny<IConfiguration>())).Returns(ct);

                var BWQInstructionsObject = BWQInstructionsService.Object;
                var p1 = BWQInstructionsObject.GetAll();
                var p2 = BWQInstructionsObject.Get(1);
                var p3 = BWQInstructionsObject.UpdateInstruction(binsdata, configuration);
                var p4 = BWQInstructionsObject.Add(ct);
                BWQInstructionsObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<BWQInstructions>>(p1);
                Assert.IsAssignableFrom<BWQInstructions>(p2);
                Assert.Equal("Test BWQInstructions", p2.CreatedBy);
                Assert.IsAssignableFrom<object>(p3);

                BWQInstructionsService.VerifyAll();

                BWQInstructionsObject.Dispose();
            }
            finally
            {
                BWQInstructionsService = null;
            }
        }
    }
}
