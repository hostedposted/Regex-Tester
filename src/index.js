import "./style.scss";
import swal from "sweetalert2";

const Swal = swal.mixin({
    allowOutsideClick: false,
});

const Input = Swal.mixin({
	input: "text",
    showCancelButton: true
});

const main = async() => {
    while (true) {
        let regex = (await Input.fire({
            html: "What is the RegEx pattern?"
        })).value;
        if (!regex) {
            await Swal.fire({
                html: "No RegEx pattern giving.",
            });
            continue;
        }
        try {
            regex = new RegExp(regex);
        }
        catch {
            await Swal.fire({
                html: "RegEx pattern is invalid."
            });
            continue;
        }
        const text = await Input.fire({
            html: "What is the Text?"
        });
        if (regex.test(text.value)) {
            await Swal.fire({
                html: "Your Pattern Works With The Text!",
                icon: "success"
            });
        }
        else {
            await Swal.fire({
                html: "Your Pattern Does Not Work With The Text.",
                icon: "error"
            });
        }
    }
};

main();