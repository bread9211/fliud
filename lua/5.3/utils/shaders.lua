return function (s)
    local _, f = pcall(function() return require("utils.shadersRaw." .. string.gmatch(s, "(%w+)%.(%w+)")()) end)

    if (f) then
        return f
    else
        print(s .. " not found")
    end
end