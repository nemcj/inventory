<template>
  <div class="p-5">
    <div class="container">
      <!--  Header  -->
      <div class="row align-items-center mb-3">
        <div class="col-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 160 44"
            fill="#ffffff"
            width="157"
            height="41"
            class="l-logo__zoot"
          >
            <polygon
              fill="#000"
              points="35.015,9.853 35.015,0.493 0.601,0.493 0.601,11.299 18.601,11.299 0,32.946 0,32.946 0,42.45 35.015,42.45 35.015,31.647 16.276,31.647 35.011,9.853"
              class="text z"
            ></polygon>
            <path
              fill="#000"
              d="M97.414-0.001c-5.971,0-11.375,2.424-15.281,6.339c-1.188,1.133-2.715,3.12-2.715,3.12s-9.227,11.699-14.109,17.896 c-0.942,1.191-1.772,1.906-1.772,1.906c-1.853,1.689-4.32,2.732-7.031,2.732c-5.742,0-10.405-4.662-10.405-10.405   c0-5.75,4.741-10.406,10.405-10.406c5.668,0,10.418,3.604,10.875,11.682l8.517-10.797C72.38,4.918,65.021,0.001,56.519,0.001   c-11.924,0-21.59,9.666-21.59,21.589c0,11.926,9.666,21.583,21.59,21.583c5.971,0,11.372-2.422,15.279-6.338   c1.231-1.141,2.271-2.582,2.271-2.582s9.69-12.287,14.104-17.889c1.485-1.884,2.223-2.445,2.223-2.445   c1.853-1.703,4.32-2.734,7.023-2.734c5.75,0,10.405,4.656,10.405,10.406c0,5.743-4.733,10.407-10.405,10.407   c-5.656,0-10.406-3.611-10.873-11.689l-8.506,10.8c3.52,7.145,10.869,12.062,19.379,12.062c11.922,0,21.578-9.656,21.578-21.583   C118.992,9.665,109.334-0.001,97.414-0.001z"
              class="text infinity"
            ></path>
            <polygon
              fill="#000"
              points="154.986,0.493 118.852,0.493 118.852,11.299 130.896,11.299 130.896,42.45 142.943,42.45 142.943,11.299 154.986,11.299"
              class="text t"
            ></polygon>
            <path
              fill="#000"
              d="M147.146,36.891c0-3.473,2.922-6.389,6.396-6.389c3.479,0,6.457,2.916,6.457,6.389c0,3.48-2.979,6.467-6.457,6.467 C150.068,43.358,147.146,40.372,147.146,36.891z"
              class="text point"
            ></path>
          </svg>
        </div>
        <form @submit="searchEan(ean)" class="col-6">
          <div class="row">
            <div class="col">
              <input
                type="text"
                v-model="ean"
                :disabled="source.length == 0"
                @keydown="validateInput()"
                placeholder="Interní ean"
                class="form-control form-control-lg"
                required
              >
            </div>
          </div>
        </form>
      </div>
      <div class="row mt-4">
        <div class="col-6">
          <label for="fileupload" class="btn btn-outline-primary mr-3 mb-0">Vybrat soubor</label>
          <small>{{ filename }}</small>
          <input
            style="display :none"
            ref="file"
            id="fileupload"
            @change="fileChange()"
            type="file"
          >
          <button @click="removeFile()" class="btn" v-if="filename != 'Soubor nevybrán'">
            <span class="fa fa-times"></span>
          </button>
        </div>
        <div class="col-6">
          <button class="btn btn-danger ml-2 float-right">Reset</button>
          <div
            :disabled="filename == 'Soubor nevybrán'"
            @click="importFiles()"
            class="btn btn-primary float-right"
          >Potvrdit</div>
        </div>
      </div>
      <hr>
      <!--  Source data table  -->
      <div class="row">
        <div class="col-2">
          <h5 class="text-muted">Zdrojová data</h5>
        </div>
        <div class="col">
          <small>Počet záznamů: {{ source.length }}</small>
        </div>
      </div>
      <div class="source-table mb-3">
        <table id="tableau" class="table table-sm">
          <thead>
            <tr>
              <th>Interní ean</th>
              <th>Název</th>
              <th>Množství</th>
            </tr>
          </thead>
          <transition-group name="list" tag="tbody">
            <tr v-for="(row, index) in source" :data-index="index" :key="row.intean">
              <td>{{ row.intean }}</td>
              <td>{{ row.název}}</td>
              <td>{{ row.množství }}</td>
            </tr>
          </transition-group>
        </table>
      </div>
      <button
        @click="copy(source)"
        :disabled="source.length == 0"
        class="btn btn-success"
      >EXPORTOVAT</button>
      <hr class="mt-5">
      <!--  Source data table  -->
      <div class="row">
        <div class="col-2">
          <h5 class="text-muted">Přebývá</h5>
        </div>
        <div class="col">
          <small>Počet záznamů: {{ over.length }}</small>
        </div>
      </div>
      <table class="table table-sm mb-5">
        <thead>
          <tr>
            <th>Interní Ean</th>
            <th>Množství</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ean in over" :key="ean.ean">
            <td>{{ ean.intean }}</td>
            <td>{{ ean.množství}}</td>
            <td>
              <div class="btn-group float-right">
                <button class="btn btn-outline-secondary btn-sm">+</button>
                <button class="btn btn-outline-secondary btn-sm mr-3 ml-3">-</button>
                <button class="btn btn-outline-secondary btn-sm">odebrat</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <button :disabled="over.length == 0" class="btn btn-success mb-5">zkopírovat přebytek</button>
      <!--  Source data table  -->
      <div class="row">
        <div class="col-2">
          <h5 class="text-muted">Nalezeno</h5>
        </div>
        <div class="col">
          <small>Počet záznamů: {{ matched.length }}</small>
        </div>
      </div>
      <table class="table table-sm">
        <thead>
          <tr>
            <th>Interní Ean</th>
            <th>Název</th>
            <th>Množství</th>
          </tr>
        </thead>
        <tbody v-if="matched">
          <tr v-for="match in matched" :key="match.id">
            <td>{{ match.intean }}</td>
            <td>{{ match.název }}</td>
            <td>{{ match.množství }}</td>
          </tr>
        </tbody>
      </table>
      <button :disabled="matched.length == 0" class="btn btn-success">zkopírovat nalezené</button>
    </div>
    <audio ref="scs">
      <source src="@/assets/audio/nice.mp3">Your browser does not support the audio element.
    </audio>
    <audio ref="err">
      <source src="@/assets/audio/err.mp3">Your browser does not support the audio element.
    </audio>
    <div ref="wrapper"></div>
  </div>
</template>

<script>
import * as inv from "@/utils/data/inventory";
import * as XLSX from "../../node_modules/xlsx/dist/xlsx.full.min.js";
import { setTimeout } from "timers";
import { saveAs } from "file-saver";
import { timeout } from "q";

export default {
  data() {
    return {
      source: [],
      over: [],
      matched: [],
      keys: [],
      ean: null,
      clipboard: null,
      filename: "Soubor nevybrán",
      loading: false
    };
  },
  methods: {
    copy(data) {
      var wb = XLSX.utils.book_new();
      const date = new Date().toLocaleString();
      wb.Props = {
        Title: "SheetJS Tutorial",
        Subject: "Test",
        Author: "Red Stapler",
        CreatedDate: new Date(2017, 12, 19)
      };

      wb.SheetNames.push("Test Sheet");

      var ws_data = [["EAN", "Item", "Amount"]];

      data.forEach(element => {
        ws_data.push(Object.values(element));
      });

      var ws = XLSX.utils.aoa_to_sheet(ws_data);
      wb.Sheets["Test Sheet"] = ws;
      var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
      function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }
      saveAs(
        new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
        `Zoot Inventura ${date}.xlsx`
      );
    },
    fileChange() {
      let file = event.target.files[0];
      file ? (this.filename = file.name) : (this.filename = "Soubor nevybrán");
    },
    importFiles() {
      let vm = this;
      let e = event;
      let file = vm.$refs.file.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = function(e) {
        var data = new Uint8Array(reader.result);
        var wb = XLSX.read(data, { type: "array" });
        var first_sheet_name = wb.SheetNames[0];
        var worksheet = wb.Sheets[first_sheet_name];
        const sourcefiles = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        sourcefiles.forEach(source => {
          let key,
            keys = Object.keys(source);
          let n = keys.length;
          let newobj = {};
          while (n--) {
            key = keys[n];
            newobj[key.toLowerCase().replace(/. /g, "")] = source[key];
          }
          vm.source.push(newobj);
        });
        if (vm.source.length > 0) vm.imported();
      };
    },
    searchEan(ean) {
      // Check for match

      let match;
      const pattern = /^[0-9]{13}$/;

      if (!pattern.test(ean)) {
        this.wronginput(ean);
        this.playErr();
        return;
      }

      this.source.forEach((element, i) => {
        if (element.intean == ean) {
          // Check quantity

          console.log(element);

          if (element.množství == 1) this.source.splice(i, 1);
          else element.množství--;

          match = { ...element };
          match.množství = 1;
        }
      });

      // If matched check for filtered matches and their quantity

      if (match) {
        let increased = false;
        this.added(match.intean);
        this.playScs();

        this.matched.forEach(element => {
          if (element.intean == match.intean) {
            increased = true;
            element.množství++;
          }
        });

        if (!increased) this.matched.push(match);
      } else {
        let matched = false;

        const item = {
          intean: ean,
          množství: 1
        };

        this.over.forEach(element => {
          if (element.intean == item.intean) {
            element.množství++;
            matched = true;
            this.notFound(element.intean);
            this.playErr();
          }
        });
        if (!matched) {
          this.over.push(item);
          this.notFound(item.intean);
          this.playErr();
        }
      }
    },
    removeFile() {
      this.$refs.file.value = null;
      this.filename = "Soubor nevybrán";
    },
    validateInput: function() {
      const value = event.target.value;
      const char = /^[0-9]*$"/;
      const letters = /^[A-Za-z]+$/;
      const pattern = /^[0-9]{10}$/;
    },
    notFound(ean) {
      const msg = "Položka nenalezena, přidána do přebytku.";
      this.notificate("danger", ean, msg);
    },
    removed(ean) {
      const msg = "Položka odebrána.";
      this.notificate("danger", ean, msg);
    },
    wronginput(input) {
      const msg = "Neodpovídá požadovanému formátu";
      this.notificate("danger", input, msg);
    },
    added(ean) {
      const msg = "Položka úspěšně nalezena!";
      this.notificate("scs", ean, msg);
    },
    imported() {
      const msg = "Položky úspěšně naimportovány";
      this.notificate("scs", "Výborně", msg);
    },
    playScs() {
      const scs = this.$refs.scs;
      scs.currentTime = 0;
      scs.play();
    },
    playErr() {
      const err = this.$refs.err;
      err.currentTime = 0;
      err.play();
    },
    notificate(type, ean, msg) {
      const container = this.$refs.wrapper;
      const div = document.createElement("DIV");
      div.classList.add("alert");

      if (type == "scs") div.classList.add("alert-success");
      else div.classList.add("alert-danger");

      div.textContent = `${ean} ${msg}`;
      container.appendChild(div);

      setTimeout(() => {
        container.removeChild(div);
      }, 5000);
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
@keyframes fade {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.btn {
  cursor: pointer;
}

.btn[disabled] {
  opacity: 0.5;
  pointer-events: none;
}

.source-table {
  max-height: 200px;
  overflow-y: auto;
}

.alert {
  position: fixed !important;
  top: 1rem;
  right: 1rem;
  animation: fade 5s ease-out forwards;
  transition: transform 0.25s ease-out;
}

.list-enter-active,
.list-leave-active {
  transition: background-color 0.25s ease-out, height 0.5s ease-out,
    opacity 0.5s ease-out, transform 1s ease-out;
}

.list-leave-active {
  background-color: #007bff;
}

.list-leave-to {
  height: 0;
  background-color: #fff;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-20px);
}

@for $i from 1 through 10 {
  .list-enter-active:nth-child(#{$i}) {
    transition-delay: $i * 100ms;
  }
  .alert:nth-of-type(#{$i}) {
    transform: translateY($i * 50px);
  }
}
</style>
