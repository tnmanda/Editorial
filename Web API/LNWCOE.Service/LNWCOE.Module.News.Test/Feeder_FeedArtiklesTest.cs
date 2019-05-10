using System.Linq;
using LNWCOE.Models.News;
using LNWCOE.Module.News.Interface;
using Moq;
using Xunit;

namespace LNWCOE.Module.News.Test
{
    public class Feeder_FeedArtiklesTest
    {
        [Fact]
        public void Feeder_FeedArtikles()
        {
            IQueryable<Feeder_FeedArtikles> Feeder_FeedArtiklesFeeder_FeedArtikles = Enumerable.Empty<Feeder_FeedArtikles>().AsQueryable();
            Feeder_FeedArtikles ct = new Feeder_FeedArtikles { pkArtikleID = 1,  ArtikleDescription = "Test Feeder_FeedArtikles" };

            Mock<IFeeder_FeedArtiklesRepository> Feeder_FeedArtiklesService = new Mock<IFeeder_FeedArtiklesRepository>();

            object obj = new object();

            try
            {
                Feeder_FeedArtiklesService.Setup(x => x.GetAll()).Returns(Feeder_FeedArtiklesFeeder_FeedArtikles);
                Feeder_FeedArtiklesService.Setup(x => x.Get(It.IsAny<int>())).Returns(ct);
                Feeder_FeedArtiklesService.Setup(x => x.Add(It.IsAny<Feeder_FeedArtikles>())).Returns(ct);
                Feeder_FeedArtiklesService.Setup(x => x.Delete(It.IsAny<Feeder_FeedArtikles>())).Verifiable();
                Feeder_FeedArtiklesService.Setup(x => x.Update(It.IsAny<Feeder_FeedArtikles>(), It.IsAny<object>())).Returns(ct);

                var Feeder_FeedArtiklesObject = Feeder_FeedArtiklesService.Object;
                var p1 = Feeder_FeedArtiklesObject.GetAll();
                var p2 = Feeder_FeedArtiklesObject.Get(1);
                var p3 = Feeder_FeedArtiklesObject.Update(ct, obj);
                var p4 = Feeder_FeedArtiklesObject.Add(ct);
                Feeder_FeedArtiklesObject.Delete(ct);

                Assert.IsAssignableFrom<IQueryable<Feeder_FeedArtikles>>(p1);
                Assert.IsAssignableFrom<Feeder_FeedArtikles>(p2);
                Assert.Equal("Test Feeder_FeedArtikles", p2.ArtikleDescription);
                Assert.Equal("Test Feeder_FeedArtikles", p3.ArtikleDescription);

                Feeder_FeedArtiklesService.VerifyAll();

                Feeder_FeedArtiklesObject.Dispose();
            }
            finally
            {
                Feeder_FeedArtiklesService = null;
            }
        }
    }
}
