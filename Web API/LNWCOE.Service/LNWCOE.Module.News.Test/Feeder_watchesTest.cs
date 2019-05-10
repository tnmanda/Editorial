using System.Linq;
using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.News.Test
{
    public class Feeder_watchesTest
    {
        [Fact]
        public void Feeder_watches()
        {
            IQueryable<Feeder_watches> Feeder_watchesFeeder_watches = Enumerable.Empty<Feeder_watches>().AsQueryable();
            Feeder_watches ct = new Feeder_watches { PkWatchID = 1, Description = "Test Feeder_watches" };

            Mock<IFeeder_watchesRepository> Feeder_watchesService = new Mock<IFeeder_watchesRepository>();

            object obj = new object();

            try
            {
                Feeder_watchesService.Setup(x => x.GetAll()).Returns(Feeder_watchesFeeder_watches);
                Feeder_watchesService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                Feeder_watchesService.Setup(x => x.Add(It.IsAny<Feeder_watches>())).Returns(ct);
                Feeder_watchesService.Setup(x => x.Delete(It.IsAny<Feeder_watches>())).Verifiable();
                Feeder_watchesService.Setup(x => x.Update(It.IsAny<Feeder_watches>(), It.IsAny<object>())).Returns(ct);

                var Feeder_watchesObject = Feeder_watchesService.Object;
                var p1 = Feeder_watchesObject.GetAll();
                var p2 = Feeder_watchesObject.Get(1);
                var p3 = Feeder_watchesObject.Update(ct, obj);
                var p4 = Feeder_watchesObject.Add(ct);
                Feeder_watchesObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<Feeder_watches>>(p1);
                Assert.IsAssignableFrom<Feeder_watches>(p2);
                Assert.Equal("Test Feeder_watches", p2.Description);
                Assert.Equal("Test Feeder_watches", p3.Description);

                Feeder_watchesService.VerifyAll();

                Feeder_watchesObject.Dispose();
            }
            finally
            {
                Feeder_watchesService = null;
            }
        }
    }
}
