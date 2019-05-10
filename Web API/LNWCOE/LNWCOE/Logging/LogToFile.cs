using System;
using System.Text;
using System.IO;
using System.Globalization;

namespace LNWCOE.Logging
{
    public class LogThis
    {
        public void ExceptionToFile(string userName, Exception exception)
        {
            string exMessage = BuildLogString(userName, exception);
            WriteToFile(exMessage, "Exceptions");
        }

        public void ExceptionToDB(string userName, Exception exception)
        {
            // TODO: Add Details for DB Logging
        }


        public string BuildLogString(string userName, Exception exception)
        {
            StringBuilder logmessage = new StringBuilder();
            logmessage.AppendLine($"Type: {exception.GetType()}");
            logmessage.AppendLine($"DateCreated: {DateTime.UtcNow.ToString(CultureInfo.InvariantCulture)}");
            logmessage.AppendLine($"Source: {exception.Source}");
            logmessage.AppendLine($"Description: {ExtractException(exception)}");
            logmessage.AppendLine($"User: {userName}");

            return logmessage.ToString();
        }

        public string ExtractException(Exception e)
        {
            string ExceptionMessage = "";

            if (e.InnerException != null)
            {
                ExceptionMessage = Environment.NewLine + "Exception: " + e.Message;
            }
            if (e.InnerException != null)
            {
                ExceptionMessage += Environment.NewLine + "Inner Exception: " + e.InnerException.Message;
            }
            ExceptionMessage += Environment.NewLine + " End.";

            return ExceptionMessage;
        }

        public void WriteToFile (string Message, string MsgFolder)
        {
            var baseDir = System.Reflection.Assembly.GetEntryAssembly().Location;
            if (!File.GetAttributes(baseDir).HasFlag(FileAttributes.Directory))
            {
                baseDir = Directory.GetParent(baseDir).FullName;
            }
            var exceptionDirectory = Path.Combine(baseDir, MsgFolder);
            var directoryInfo = new DirectoryInfo(exceptionDirectory);
            if (!directoryInfo.Exists)
            {
                directoryInfo.Create();
            }

            var ExceptionFileName = MsgFolder + "_" + DateTime.UtcNow.ToString("yyyy_MM_dd_hh_mm_ss") + ".txt";

            File.WriteAllText(Path.Combine(exceptionDirectory, ExceptionFileName), Message);
        }
    }
}
