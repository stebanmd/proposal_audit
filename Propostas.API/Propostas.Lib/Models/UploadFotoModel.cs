using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BradescoNext.Lib.Models
{
    public class UploadFotoModel
    {
        public string file { get; set; }
        public int width { get; set; }
        public int height { get; set; }
        public int x { get; set; }
        public int y { get; set; }
    }
}