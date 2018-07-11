using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BradescoNext.Lib.Entity;

namespace BradescoNext.Lib.Models
{
    public class VizualizarIndicadoModel
    {
        public List<HistoriaVizualizaModel> Historias { get; set; }
        public InformacoesIndicadoModel Infos { get; set; }
        
    }
}
