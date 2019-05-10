using System;
using System.Collections.Generic;
using System.Text;
using LNWCOE.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace LNWCOE.Tests
{
    public class TestBase
    {
        /*
        Change these settings from your environment otherwise tests will not work

        HumanReviewUri - The Url for the Human Review API
        WebApiUri - The Url for the Editorial API

        */
        const string HumanReviewUri = "http://bgpc000032913:8089/api/auth/token";
        const string WebApiUri = "http://bgpc000032913:8083";



        private Dictionary<string, string> dict = new Dictionary<string, string>
        {
            { "TokenValues:issuer", "http://editorial-api.spi-global.com"},
            {"TokenValues:audience", "http://editorial-ui.spi-global.com"},
            {"TokenValues:expiresInMinutes", "300"},
            {"TokenValues:key", "my-secret-key-to-use"},
            {"HumanReview:uri", HumanReviewUri},
            {"WebApi:uri", WebApiUri}
        };

        protected DbContextOptions<AppDbContext> opt;
        protected DbContextOptions<NEWSDBContext> optnews;
        protected IConfiguration conf;

        public TestBase()
        {
            InitConfig();
        }

        internal void InitConfig()
        {
            if (conf is null)
            {
                var builder = new DbContextOptionsBuilder<AppDbContext>();
                builder.UseInMemoryDatabase(Guid.NewGuid().ToString());
                opt = builder.Options;

                var newsbuilder = new DbContextOptionsBuilder<NEWSDBContext>();
                newsbuilder.UseInMemoryDatabase(Guid.NewGuid().ToString());
                optnews = newsbuilder.Options;

                var confbuilder = new ConfigurationBuilder();
                confbuilder.AddInMemoryCollection(dict);
                conf = confbuilder.Build();
            }
        }
    }
}
