const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: null,
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ]
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            syncTokenFromSessionStore: () => {
                const token = sessionStorage.getItem("token");
                console.log("Application loaded, synced with session storage token");
                const store = getStore();
                if (token && token !== "" && token !== undefined) {
                    setStore({ token: token });
                }
            },

            logout: () => {
                sessionStorage.removeItem("token");
                console.log("Logged out");
                setStore({ token: null });
            },

            login: async (email, username, password) => {
                const opts = {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        username: username,
                        password: password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                try {
                    const response = await fetch("https://obscure-goldfish-pxw77v79q6j3rx6x-3001.app.github.dev/api/token", opts);
                    if (response.status !== 200) {
                        throw new Error("Error");
                    }
                    const data = await response.json();
                    console.log("This came from the backend", data);
                    sessionStorage.setItem("token", data.access_token);
                    setStore({ token: data.access_token });
                } catch (error) {
                    console.log("Error", error);
                }
            },

            register: async (email, username, password) => {
                const opts = {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        username: username,
                        password: password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                try {
                    const response = await fetch("https://obscure-goldfish-pxw77v79q6j3rx6x-3001.app.github.dev/api/register", opts);
                    if (response.status !== 200) {
                        throw new Error("Error");
                    }
                    const data = await response.json();
                    console.log("User registered successfully", data);
                } catch (error) {
                    console.log("Error", error);
                }
            },

			getMessage: async () => {
				const store = getStore();
				const opts = {
					headers: {
						Authorization: "Bearer " + store.token
					}
				};
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello", opts);
					const data = await resp.json();
					setStore({ message: data.message });
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;

