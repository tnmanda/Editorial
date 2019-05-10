using System.Linq;
using LNWCOE.Models.BWQ;
using LNWCOE.Module.BWQ.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.BWQ.Test
{
    public class BWQDispositionsTest
    {
        [Fact]
        public void BWQDispositions()
        {
            IQueryable<BWQDispositions> BWQDispositionsBWQDispositions = Enumerable.Empty<BWQDispositions>().AsQueryable();
            BWQDispositions ct = new BWQDispositions { BWQDispositionsID = 1,  BWQDispositionsDescription = "Test BWQDispositions" };

            Mock<IBWQDispositionsRepository> BWQDispositionsService = new Mock<IBWQDispositionsRepository>();

            object obj = new object();

            try
            {
                BWQDispositionsService.Setup(x => x.GetAll()).Returns(BWQDispositionsBWQDispositions);
                BWQDispositionsService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                BWQDispositionsService.Setup(x => x.Add(It.IsAny<BWQDispositions>())).Returns(ct);
                BWQDispositionsService.Setup(x => x.Delete(It.IsAny<BWQDispositions>())).Verifiable();
                BWQDispositionsService.Setup(x => x.Update(It.IsAny<BWQDispositions>(), It.IsAny<object>())).Returns(ct);

                var BWQDispositionsObject = BWQDispositionsService.Object;
                var p1 = BWQDispositionsObject.GetAll();
                var p2 = BWQDispositionsObject.Get(1);
                var p3 = BWQDispositionsObject.Update(ct, obj);
                var p4 = BWQDispositionsObject.Add(ct);
                BWQDispositionsObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<BWQDispositions>>(p1);
                Assert.IsAssignableFrom<BWQDispositions>(p2);
                Assert.Equal("Test BWQDispositions", p2.BWQDispositionsDescription);
                Assert.Equal("Test BWQDispositions", p3.BWQDispositionsDescription);

                BWQDispositionsService.VerifyAll();

                BWQDispositionsObject.Dispose();
            }
            finally
            {
                BWQDispositionsService = null;
            }
        }
    }
}
