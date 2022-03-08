import axios from "axios";
import toastr from "toastr";
import navAdmin from "./navAdmin";
import "toastr/build/toastr.min.css";
import { themSP } from "../../api/products";

const addProducts = {
    async render() {
        return /* html */ `
            <div>
                ${navAdmin.render()}
            </div>
            
            <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="mt-5 md:mt-0 md:col-span-4">
                    <form action="" id="add-form-asm">
                        <div class="shadow sm:rounded-md sm:overflow-hidden">
                            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <div class="">
                                <label class="block text-sm font-medium text-gray-700">Name</label>
                                <input 
                                class="border border-gray-300 rounded-md w-full h-[35px]"
                                type="text" class="border border-black" id="add-name">
                            </div>
                
                            <div>
                                <label for="about" class="block text-sm font-medium text-gray-700"> Desc </label>
                                <div class="mt-1">
                                    <textarea id="add-desc" name="about" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Description"></textarea>
                                </div>
                            </div>

                            <div class="">
                                <label class="block text-sm font-medium text-gray-700">Price</label>
                                <input 
                                class="border border-gray-300 rounded-md w-full h-[35px]"
                                type="number" class="border border-black" id="add-price">
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700"> Image </label>
                                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div class="space-y-1 text-center">
                                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div class="flex text-sm text-gray-600">
                                    
                                    <input id="add-img" name="file-upload" type="file" >

                                    </div>
                                    <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div class="btn px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button type="submit" class="btn inline-flex justify-center py-2 px-4 
                                border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
                                bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Add</button>
                            </div>
                        </div>
                    </form>
                </div>  
                </div>
            </div>
        `;
    },
    afterRender() {
        const formAdd = document.querySelector("#add-form-asm");
        const CLOUDINARY_PRESET = "v7xao77w";
        const CLOUDINARY_API_URL = "https://api.cloudinary.com/v1_1/dd0io3fh2/image/upload";

        formAdd.addEventListener("submit", async (e) => {
            e.preventDefault();
            try {
                const file = document.querySelector("#add-img").files[0];
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", CLOUDINARY_PRESET);

                const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
                    headers: {
                        "Content-Type": "application/form-data",
                    },
                });
                themSP({
                    name: document.querySelector("#add-name").value,
                    img: data.url,
                    desc: document.querySelector("#add-desc").value,
                    price: document.querySelector("#add-price").value,
                });
                toastr.success("Bạn đã thêm thành công");
                setTimeout(() => {
                    document.location.href = "/admin/listProducts";
                }, 1000);
            } catch (error) {
                toastr.error("Thêm thất bại");
            }
        });
    },
};
export default addProducts;