local function RecursiveSearch(table)
	local o = js.new(js.global.Object)

    for key, value in pairs(table) do
        if(type(value) == "table") then
            o[key] = RecursiveSearch(value)
        else
			assert(type(key) == "string" or js.typeof(key) == "symbol", "JavaScript only has string and symbol keys")
            o[key] = value
        end
    end

	return o
end

return RecursiveSearch