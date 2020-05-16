
let questions = [
    {
        question:"Który z tych metali jest płynny w temperaturze pokojowej?",
        pic:"asset/img/metal.jpg",
        answers:[
            {
                text:"Rtęć",
                pic:"asset/img/mercury.jpg"
            }, {
                text:"Żelazo",
                pic:"asset/img/iron.jpg"
            }, {
                text:"Gal",
                pic:"asset/img/galium.jpg"
            }
        ],
        rightAnswer:0
    }
    ,
    {
        question:"Jaka jest stolica Belgii",
        answers:[
            {
                text:"Bruksela",
            }, {
                text:"Amsterdam",
            }, {
                text:"Londyn",
            }
        ],
        rightAnswer:0
    }
    ,
    {
        question:"Czukcze mieszkają na terytorium:",
        answers:[
            {
                text:"Finlandii",
            }, {
                text:"Rosji",
            }, {
                text:"USA",
            }
        ],
        rightAnswer:1
    }

]

Vue.component('answer',{
    props:['answer',"onbutton","id"],
    method: {
        answerClick: function(){

        }
    },
    template:`
    <div>
        <img class='crop' v-if="answer.pic" v-bind:src='answer.pic'></img>
        <p>{{id}}: {{answer.text}}</p>
        <b-button v-on:click="onbutton">Wybierz</b-button>
    </div>
    `
})

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
Vue.component('question',
    {
        data: function () {
            return {
                alert:{
                    visible:false,
                    kind:"danger",
                    text:"wui",
                    lastUpdate:0
                }
            }
        },
        props:[
            'question',
            'answerCallback'
        ],
        methods: {
            onChooseAnswer: function(arg){

                var ar = (arg==this.question.rightAnswer)
                var lastUpdate =  Date.now()
                if(ar){
                    this.alert={
                        kind:"success",text:"Poprawnie.", lastUpdate:lastUpdate,visible:true
                    }
                } else {
                    this.alert={
                        kind:"danger",text:"Niepoprawnie.", lastUpdate:lastUpdate,visible:true
                    }
                }
                setTimeout(()=>{
                    if(this.alert.lastUpdate == lastUpdate)
                        this.alert.visible=false
                },5000)
                if(this.answerCallback){
                    this.answerCallback(ar)
                }
                return ar;
            }
        },
        template:`
        <b-container class="bv-example-row">
            <b-row class="text-center">

                <b-col>
                    <img class='crop' v-if="question.pic" v-bind:src='question.pic'></img>
                <p>{{question.question}}
                </p>

                </b-col>
            </b-row>
            <b-row class="text-center">
                <b-col v-for="(elem,index) in question.answers">
                    <answer v-bind:answer="elem" v-bind:id="index" v-bind:onbutton="()=>onChooseAnswer(index)">

                    </answer>
                </b-col>
            </b-row>
            <b-alert fade v-bind:variant="alert.kind" v-model="alert.visible">{{alert.text}}</b-alert>
        </b-container>
        `
    }
)

Vue.component("quiz", {
    data:function (){
        return {
            wrongAnswers:0,
            rightAnswers:0,
            currentIdx: getRandomInt(questions.length)
        }
    },
    methods: {
        answer:function(isRight){
            if(isRight){
                this.rightAnswers+=1;
            }else{
                this.wrongAnswers+=1;
            }
            this.currentIdx= getRandomInt(questions.length)
        }

    },
    template:`
    <div>
            <b-container class="bv-example-row">
            <b-row class="text-center"></b-row>
    <h2>Poprawne: {{rightAnswers}}, Niepoprawne: {{wrongAnswers}}</h2>

    </b-row></b-container>

    <question v-bind:question="questions[this.currentIdx]" v-bind:answerCallback="answer"></question>
    </div>
    `
    
})