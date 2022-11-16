<script lang="ts" setup>
const MAX_CAPACITY = 1500
const MAX_DAYS = 21

const stats = reactive({
  startAt: new Date(2022, 8, 15),
  isOnline: true,
  light: true,
  humidity: 0.89,
  temperature: 22.5,
  nozzleMode: 0,
  pH: 7.5,
  waterLevel: 0.36,
  capacity: 81,
})
</script>

<template>
  <div class="flex flex-col gap-4 px-6">
    <stats-highlight-card
      device-name="Perangkat 1"
      :session-start-at="stats.startAt"
      :is-device-online="stats.isOnline"
      :is-light-on="stats.light"
      :max-days="MAX_DAYS"
      :parameters="[
        {
          label: 'Humidity',
          value: stats.humidity * 100,
          suffix: '%',
          icon: 'i-material-symbols:humidity-high',
          iconClass: 'text-teal-300',
        },
        {
          label: 'Temperature',
          value: stats.temperature,
          suffix: '℃',
          icon: 'i-material-symbols:device-thermostat',
          iconClass: 'text-red-300',
        },
      ]"
    />

    <main class="flex flex-col gap-4">
      <section class="flex justify-between items-center p-4 bg-teal-200 rounded-2xl">
        <h3 class="text-base text-slate-700 font-medium">
          Mode penyemprotan
        </h3>

        <select
          v-model="stats.nozzleMode"
          name="control_nozzleMode"
          class="text-green-800 font-medium bg-green-300 px-2 py-1 rounded-lg"
        >
          <option value="0">
            Auto
          </option>
          <option value="1">
            Manual
          </option>
        </select>
      </section>

      <div class="stats">
        <section>
          <div class="label">
            <h3>Skala pH</h3>
            <div i-material-symbols:help class="text-base text-slate-400" />
          </div>
          <progress-bar :value="stats.pH / 14" :bar="14" bar-class="bg-teal-700" />
          <!-- Create progress bar with 14 divided bars  -->
          <!-- <div class="h-3 flex gap-1">
            <div
              v-for="n in 14"
              :key="n"
              class="grow relative bg-slate-300 overflow-hidden first:rounded-l last:rounded-r"
            >
              <div
                class="absolute inset-y-0 left-0 bg-teal-700 rounded-inherit"
                :style="{ width: `${(stats.pH - Number(n)) * 100}%` }"
              />
            </div>
          </div> -->
          <div class="flex justify-between text-slate-700">
            <span w-2ch>1</span>
            <span w-2ch>7</span>
            <span w-2ch>14</span>
          </div>
        </section>

        <section>
          <div class="label">
            <h3>Tingkatan Air</h3>
            <div i-material-symbols:help class="text-base text-slate-400" />
          </div>
          <progress-bar :value="stats.waterLevel" :bar="4" bar-class="bg-yellow-500" />
          <div class="flex justify-between text-slate-700">
            <span w-4ch>0%</span>
            <span w-4ch>100%</span>
          </div>
        </section>

        <section>
          <div class="label">
            <h3>Kapasitas penampungan</h3>
            <div i-material-symbols:help class="text-base text-slate-400" />
          </div>
          <progress-bar :value="stats.capacity / MAX_CAPACITY" bar-class="bg-green-500" />
          <div class="flex text-slate-700">
            <span>{{ stats.capacity }}/{{ MAX_CAPACITY }} Liter</span>
          </div>
        </section>
      </div>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut cupiditate esse earum vitae eveniet eum hic minus modi dolores! Id recusandae eligendi quam accusamus sapiente? Perspiciatis quasi illum non, assumenda eaque totam eveniet, obcaecati tenetur quaerat tempore nostrum qui inventore deserunt pariatur! Mollitia porro, tenetur unde magni doloribus distinctio laboriosam sit possimus eveniet dolore aut nobis, vel quasi tempore veniam praesentium exercitationem ut ullam earum perspiciatis dignissimos. Exercitationem recusandae, culpa quam nisi incidunt, asperiores, fuga sapiente nihil labore suscipit eveniet earum voluptates assumenda soluta optio laborum itaque accusamus odio ipsum maiores molestias tempora sequi quas! Ut ullam inventore perspiciatis deserunt dolore repellat maiores doloribus voluptatibus maxime magnam, praesentium voluptate quod aperiam quis sequi quia nulla totam provident quaerat dignissimos, nesciunt cupiditate repudiandae, est culpa. Exercitationem esse in, odit natus laborum odio quidem ad dolores tempora labore illum delectus incidunt aspernatur molestiae laboriosam, possimus doloribus quasi harum commodi? Cupiditate sit quia eos culpa, molestiae esse totam alias dolorum minus officia eaque illo, nemo aliquam rem modi at hic, ad repellendus ipsum eligendi autem unde. Officia sapiente quibusdam obcaecati possimus dolorem dolorum natus dignissimos velit, enim iure odio sunt fuga perferendis ea quisquam magnam. Deserunt ducimus numquam perferendis facilis mollitia iste consequuntur quasi officiis commodi unde asperiores quo at architecto aperiam ratione accusantium ad animi tempora magnam cupiditate, sequi fugiat! Voluptas repudiandae culpa quis itaque, sequi vel voluptatum. Inventore quas id alias, explicabo aliquid nam excepturi corrupti quaerat expedita incidunt maxime cupiditate accusantium dicta obcaecati, minima quis eligendi laudantium temporibus doloribus! Enim architecto, omnis unde iusto perferendis alias ullam sit illo fugit officiis, animi, aspernatur temporibus neque et odit quia eaque facilis molestias minus cupiditate sequi doloremque! Eum perspiciatis expedita omnis iusto ab consequatur cum inventore ea, veritatis, magni exercitationem sunt laudantium a quos quae? Hic dicta accusantium excepturi id dignissimos perspiciatis, nesciunt velit sint distinctio quasi saepe quam placeat, tenetur nisi? Totam ipsam sequi laudantium ullam, vero corporis, illum nemo necessitatibus provident pariatur dolorum dolores magnam tenetur doloremque sunt eligendi enim qui molestias itaque minus iusto. Amet nostrum excepturi vero recusandae perferendis fugit omnis. Consequatur hic, enim deleniti quia ducimus sunt repellat explicabo optio rerum autem aliquam magni aut cum illo ullam error sapiente obcaecati odit dolorem laudantium corporis ad incidunt inventore sit. Ex enim earum architecto, quidem omnis molestiae ut aut similique repellat officiis nostrum magni voluptate quos tempora quo, cupiditate dolor facere exercitationem praesentium? Porro sed amet ipsum blanditiis dolorem! Sed, optio nulla. Ratione ad esse qui? Neque, dolorem quidem. Eveniet dolorem atque voluptatum provident, earum quis, dolor nulla neque blanditiis, unde illum. Quod laborum repellat doloremque voluptas dolore corrupti labore autem laudantium quis, maxime quo commodi, aliquam repudiandae aspernatur dolorem obcaecati enim magni, delectus exercitationem itaque! Assumenda explicabo quae eos reiciendis odit inventore illum sapiente doloribus, eius quisquam officia distinctio necessitatibus! Harum nobis consequatur temporibus ullam, eos officia autem aliquam excepturi expedita placeat iusto voluptate dignissimos labore debitis culpa sed earum ratione. Expedita, ullam voluptatum perspiciatis impedit quisquam laudantium mollitia eos earum maxime ut iure ea temporibus nemo possimus optio veritatis, non reiciendis minus a alias repudiandae ipsum neque? Unde, laudantium. At expedita veritatis natus commodi, tenetur soluta accusamus aperiam sapiente quis ipsum unde quisquam non velit asperiores. Illo eius mollitia placeat, vitae laudantium dolorem doloribus minus, aliquam ipsam molestias quaerat qui? Facere laboriosam provident consequatur natus veritatis voluptatum? Ullam, laborum maxime. Itaque nemo perspiciatis autem sed assumenda laborum adipisci. Velit cum enim dolores sunt nam suscipit temporibus vel natus, nihil eveniet qui porro ratione et voluptatibus similique sapiente nulla sed animi autem, ipsum quia voluptate obcaecati at? Libero porro dolorem hic accusantium excepturi. Ipsa cum facere laudantium error ex iusto a illo vero minima repellat. Quas nisi provident repellendus deserunt tempora asperiores necessitatibus quidem debitis ea eum. Voluptate cumque fuga quam esse suscipit quod praesentium et officiis tempora voluptatem, eum nostrum explicabo ex mollitia culpa impedit eos sapiente, neque quos iste minus nemo ut obcaecati? Quos deleniti possimus officiis excepturi iure distinctio nam ipsam officia fuga! Quia neque, repellat error porro similique non sequi magni provident! Sunt minima quas, error praesentium enim nisi fugit in voluptates tempora eligendi eos ad quia, molestias, commodi porro impedit sit debitis. Commodi quisquam explicabo animi aspernatur accusantium id ipsa! Amet quasi iusto magni ipsum dolore obcaecati in quae hic provident numquam, culpa consequatur commodi, velit nisi. Iure expedita quo officia et sapiente alias quasi veniam necessitatibus laboriosam. Saepe, consequatur quis ab nihil soluta cumque vel facilis ipsa amet cum quae dolor illo quos adipisci? Quidem debitis earum aliquid sunt blanditiis. Deserunt est fugit esse sit corporis deleniti, eius eaque reiciendis et at molestias hic, rem ipsum doloremque illo beatae culpa explicabo rerum quis mollitia enim. Quo, accusantium quibusdam placeat numquam assumenda delectus maxime non perspiciatis velit deleniti ducimus corporis magni fugit, odit qui commodi, repellat dolorem laborum obcaecati illo blanditiis vel ipsa pariatur. Asperiores dolores rem labore porro accusantium beatae illum eligendi dolorum dolore assumenda possimus adipisci, repellat aut inventore, corrupti reprehenderit molestias. Dignissimos quo impedit ullam mollitia quia eaque minus praesentium pariatur tenetur, porro placeat dolores iure, dicta voluptas illum sunt? Cupiditate pariatur provident rem dicta magnam accusantium, tempora molestias voluptatibus maiores, aperiam qui laborum sed tempore quam quas, cum nihil maxime magni nostrum blanditiis? Accusamus fugit modi vitae perspiciatis adipisci sit, eos magni. Ea eos debitis adipisci obcaecati, sapiente veniam. Ipsum minus magni dicta hic omnis voluptate distinctio voluptas quod libero deleniti sint, est repudiandae quia a, eveniet cum reprehenderit necessitatibus quaerat velit! Velit dolorem odit maiores cum, cupiditate eius ratione, quam in facilis rerum, officiis ipsa reprehenderit ut error repellat aut praesentium deleniti magnam ipsam numquam! Deserunt hic eius eligendi animi asperiores tempora voluptatem eaque ut aliquid fugiat cupiditate necessitatibus soluta, nam reprehenderit excepturi quas rerum enim molestias recusandae quisquam corporis doloremque magnam perspiciatis officia. Laboriosam reiciendis quam eum perferendis a, explicabo dignissimos ipsam excepturi voluptatibus ut veniam sint unde voluptas rerum quod odio incidunt error deserunt libero consectetur quos quasi maiores? Voluptatibus modi iusto animi cupiditate excepturi quae beatae libero reiciendis hic ea. Quidem, ut? Mollitia, reprehenderit.</p>
    </main>
  </div>
</template>

