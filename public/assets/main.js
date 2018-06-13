var commands = {
    strmod: "$c str",
    dexmod: "$c dex",
    conmod: "$c con",
    intmod: "$c int",
    wismod: "$c wis",
    chamod: "$c cha",
    strsav: "$s str",
    dexsav: "$s dex",
    consav: "$s con",
    intsav: "$s int",
    wissav: "$s wis",
    chasav: "$s cha",
    acro: "$c acro",
    anim: "$c anim",
    arca: "$c arca",
    athl: "$c athl",
    dece: "$c dece",
    hist: "$c hist",
    insi: "$c insi",
    inve: "$c inve",
    medi: "$c medi",
    natu: "$c natu",
    perc: "$c perc",
    pers: "$c pers",
    reli: "$c reli",
    slei: "$c slei",
    stea: "$c stea",
    surv: "$c surv",
    a1: "Error: Add an Attack action!",
    a2: "Error: Add an Attack action!",
    a3: "Error: Add an Attack action!",
    a4: "Error: Add an Attack action!",
    a5: "Error: Add an Attack action!",
    s1: "Error: Add a Spell action!",
    s2: "Error: Add a Spell action!",
    s3: "Error: Add a Spell action!",
    s4: "Error: Add a Spell action!",
    s5: "Error: Add a Spell action!",
    D100: "$r 1d100",
    D20: "$r 1d20",
    D12: "$r 1d12",
    D10: "$r 1d10",
    D8: "$r 1d8",
    D6: "$r 1d6",
    D4: "$r 1d4",
    D3: "$r 1d3",
    D2: "$r 1d2",
    p1: "insertlabel",
    p2: "insertlabel",
    p3: "insertlabel",
    p4: "insertlabel",
    p5: "insertlabel"
};

$(() => {
    $('button').click((e) => {
        e.preventDefault();

        var cmd = commands[e.target.id];
        if (cmd.substring(0, 1) == "$") {
            $.get('/cmd/' + cmd).done((r) => {
                if (r.success != true) {
                    alert('There was an error running that command.');
                }
            });
        } else {
            alert(cmd);
        }
    });
});